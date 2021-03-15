var http = require("http")
var fs = require("fs")
var path = require("path")
var lista = { info: "", dires: [], files: [], covers: [] };



const _Mime_Type = {
    ".html": "text/html",
    ".json": 'application/json',
    ".jpg": "image/jpeg"
}
function getMimeType(url) {
    return _Mime_Type[path.extname(url).toLowerCase()] || "text/html"
}
var server = http.createServer(function (req, res) {
    let info = "";
    switch (req.method) {
        case "GET":
            handleGet(req, res)
            break;
        case "POST":
            //nie moge nic console logwoac nie wiem dlaczego
            req.on("data", function (data) {
                info += data;
            })

            req.on("end", function () {
                info = JSON.parse(info)
                console.log(info)
                fileNames(info, () => {
                    handleGet(req, res)
                })

            })
            break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

function fileNames(info, callback) {
    if (info != undefined) {
        let i = 0
        lista = { info: "", dires: [], files: [], covers: [] }
        let files = []
        try {
            files = fs.readdirSync(__dirname + "\\static\\covers")
            files.forEach(function (file) {
                let stats = fs.statSync(__dirname + "\\static\\covers\\" + file);
                if (stats.isFile()) {
                    lista.covers.push(file)
                }
            });
        } catch (err) {
            console.log(err)
        }
        try {
            files = fs.readdirSync(__dirname + "\\static\\mp3")
        }
        catch (err) {
            return console.log(err);
        }

        files.forEach(function (file) {
            let stats = fs.statSync(__dirname + "\\static\\mp3\\" + file);
            if (!stats.isFile()) {

                lista.dires.push(file)
                try {
                    files2 = fs.readdirSync(__dirname + "\\static\\mp3\\" + file)
                }
                catch (err2) {
                    return console.log(err2);
                }

                files2.forEach(function (file2) {
                    let stats2 = fs.statSync(__dirname + "\\static\\mp3\\" + file + "\\" + file2);
                    if (stats2.isFile()) {
                        if ((info.info == "FIRST" && info.album == i) || (info.info == "NEXT" && i == info.album)) {
                            let Size = stats2.size
                            lista.files.push({ name: file2, size: Size, dire: file })
                        }
                    }
                });
                i++


            }
        });
    }
    callback()
}

function handleGet(req, res) {
    let url = req.url
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (url === '/') {
        console.log("tak")
        res.setHeader("Content-Type", 'application/json')
        res.writeHead(200)
        return res.end(JSON.stringify(lista, null, 4))
    }
    let filepath = path.join('static', url)
    console.log(filepath)
    fs.readFile(filepath, function (err, data) {
        if (err) {
            res.writeHead(404)
            return res.end("File not found")
        }
        res.setHeader("Content-Type", getMimeType(url))
        res.writeHead(200)
        res.end(data)
    })
}
