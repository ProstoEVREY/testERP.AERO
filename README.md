# Description

REST API made as a testing task for ERP.AERO

# API

<p>/signup [POST] -> {id,password} returns TokenPair</p>
<p>/signin [POST] -> {id,password} returns TokenPair</p>
<p>/logout [GET] -> {}, headers.authorization</p>
<p>/signin/new_token [POST] -> {}, headers.authorization (Refresh)</p>

<p>/info [GET] -> {}, headers.authorization (Bearer), returns User</p>
<p>/latency [GET] -> {}, headers.authorization (Bearer), returns Server responce latency</p>

<p>/file/list?page_size=X&page=Y [GET] -> {},headers.authorization (Bearer) returns File list paginated by list_size (default 10) and page (default 1) </p>
<p>/file/:id [GET] -> {},headers.authorization (Bearer) returns File info by id </p>
<p>/file/download/:id [GET] -> {}, headers.authorization (Bearer) returns Downloaded file</p>
<p>/file/upload [POST] -> {file}, headers.authorization (Bearer) creates new File</p>
<p>/file/update/:id [PUT] -> {file}, headers.authorization (Bearer) updated File by id</p>

# System

The Express.js normal framework layout is used.

<p>Routes as Controllers address the Services</p>
<p>Prisma is used as MySQL ORM</p>
<p>All sensitive information is stored in .env</p>

# Launch

$ npm install

<p> $ npm run start </p>
