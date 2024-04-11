import { Router } from "express";
import {
  fileUpdate,
  fileGet,
  fileList,
  fileDelete,
  fileUpload,
  fileDownload,
} from "../Services/FileService";

const router = Router();

router.post("/upload", fileUpload);
router.get("/list", fileList);
router.get("/:id", fileGet);
router.get("/download/:id", fileDownload);
router.put("/update/:id", fileUpdate);
router.delete("/delete/:id", fileDelete);

export { router as FileRouter };
