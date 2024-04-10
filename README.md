# Description

REST API made as a testing task for ERP.AERO

# API

<p>/signup [POST] -> {id,password} returns TokenPair</p>
<p>/signin [POST] -> {id,password} returns TokenPair</p>
<p>/logout [GET] -> {}, headers.authorization</p>
<p>/signin/new_token [POST] -> {}, headers.authorization (Refresh)</p>

<p>/info [GET] -> {}, headers.authorization (Bearer), returns User</p>
<p>/latency [GET] -> {}, headers.authorization (Bearer), returns Server responce latency</p>
