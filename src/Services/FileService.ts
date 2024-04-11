import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../..";
import { UploadedFile } from "express-fileupload";

interface File extends UploadedFile {
  name: string;
  mimetype: string;
  size: number;
}

// File services

export const fileUpload = (req: Request, res: Response) => {
  try {
    {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "No files were uploaded" });
      }

      const uploadedFile = req.files.file as File;

      const filename = uploadedFile.name;
      const mimeType = uploadedFile.mimetype;
      const extension = uploadedFile.name.split(".").pop();
      const filesize = uploadedFile.size;

      const id = uuidv4();

      uploadedFile.mv(`uploads/${id}.` + extension, async (err) => {
        if (err) {
          return res.status(500).json({ error: "Could not upload file" });
        }

        const file = await prisma.file.create({
          data: {
            id: id,
            filename: filename,
            mimetype: mimeType,
            size: filesize,
          },
        });

        return res.status(200).json(file);
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const fileList = async (req: Request, res: Response) => {
  try {
    const listSize = parseInt(req.query.list_size as string, 10) || 10;
    const pageNumber = parseInt(req.query.page as string, 10) || 1;

    const skip = (pageNumber - 1) * listSize;

    const files = await prisma.file.findMany({
      take: listSize, // Limit the number of records returned per page
      skip,
    });
    return res.status(200).json(files);
  } catch (e) {
    console.error(e);
  }
};

export const fileGet = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "The id is incorrect" });
  }

  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  if (!file) {
    return res.status(500).json({ message: "No file with this ID found!" });
  }

  return res.status(200).json(file);
};

export const fileDownload = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "The id is incorrect" });
    }

    const file = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });

    if (!file) {
      return res.status(500).json({ message: "No file with this ID found!" });
    }

    const filePath = path.join(
      __dirname + "/../../../",
      "uploads",
      id + "." + file.filename.split(".").pop(),
    );

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "File not found" });
      }

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } catch (e) {}
};

export const fileUpdate = async (req: Request, res: Response) => {
  try {
    {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "No files were uploaded" });
      }

      const id = req.params.id;

      const file = await prisma.file.findUnique({
        where: {
          id: id,
        },
      });

      if (!file) {
        return res.status(400).json({ message: "No file with this ID exists" });
      }

      const uploadedFile = req.files.file as File;

      const filename = uploadedFile.name;
      const mimeType = uploadedFile.mimetype;
      const extension = uploadedFile.name.split(".").pop();
      const filesize = uploadedFile.size;

      const filePath = path.join(
        __dirname + "/../../../",
        "uploads",
        id + "." + file.filename.split(".").pop(),
      );

      fs.unlinkSync(filePath);

      uploadedFile.mv(`uploads/${id}.` + extension, async (err) => {
        if (err) {
          return res.status(500).json({ error: "Could not upload file" });
        }

        const file = await prisma.file.update({
          where: {
            id: id,
          },
          data: {
            filename: filename,
            mimetype: mimeType,
            size: filesize,
          },
        });

        return res.status(200).json(file);
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const fileDelete = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "The id is incorrect" });
    }

    const file = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });

    if (!file) {
      return res
        .status(400)
        .json({ message: "File with this id does not exist!" });
    }

    const filePath = path.join(
      __dirname + "/../../../",
      "uploads",
      id + "." + file.filename.split(".").pop(),
    );

    fs.unlinkSync(filePath);

    await prisma.file.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: `File with id ${id} deleted` });
  } catch (e) {
    console.error(e);
  }
};
