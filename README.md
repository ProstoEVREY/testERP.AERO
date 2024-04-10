# Description

REST API made as a testing task for ERP.AERO

# API

/signup [POST] -> {id,password} returns TokenPair
/signin [POST] -> {id,password} returns TokenPair
/logout [GET] -> {}, headers.authorization
/signin/new_token [POST] -> {}, headers.authorization (Refresh)

/info [GET] -> {}, headers.authorization (Bearer), returns User
/latency [GET] -> {}, headers.authorization (Bearer), returns Server responce latency
