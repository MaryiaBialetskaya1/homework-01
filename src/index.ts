import express, {Request, Response}  from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

let videos: any[] = []
let AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

app.get('/', (req: Request, res: Response) =>{
    res.send("IT-Incubator!!!")
})

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    videos.length = 0
    res.send(204)
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.post('/videos', (req: Request, res: Response) =>{
    const error = []

    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions

    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        error.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }
    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        error.push({
            "message": "Incorrect author",
            "field": "author"
        })
    }
    if(availableResolutions){
        if(!Array.isArray(availableResolutions)){
            error.push({
                "message": "Incorrect available resolution",
                "field": "availableResolutions"
            })
        } else{
            availableResolutions.forEach(resolution => {
                !AvailableResolutions.includes(resolution) && error.push({
                    "message": "Incorrect available resolution",
                    "field": "availableResolutions"
                })
            })
        }
    }

    if(error.length){
        res.status(400).send({errorMessages: error})
        return;
    }
    const newVideo = {
        id: +(new Date().getTime()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: (new Date(Date.now()).toISOString()),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)

})

app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = videos.find(v => v.id === id)
    if(video){
        res.send(video)
    } else {
        res.send(404)
    }
})

app.put('/videos/:id',(req: Request, res: Response) => {
    const error = []

    let title = req.body.title
    let author = req.body.author
    let canBeDownloaded = req.body.canBeDownloaded
    let publicationDate = req.body.publicationDate
    let availableResolutions = req.body.availableResolutions

    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        error.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }
    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        error.push({
            "message": "Incorrect author",
            "field": "author"
        })
    }
    if(availableResolutions){
        if(!Array.isArray(availableResolutions)){
            error.push({
                "message": "Incorrect available resolution",
                "field": "availableResolutions"
            })
        } else{
            availableResolutions.forEach(resolution => {
                !AvailableResolutions.includes(resolution) && error.push({
                    "message": "Incorrect available resolution",
                    "field": "availableResolutions"
                })
            })
        }
    }
    if(typeof canBeDownloaded !== "boolean"){
        error.push({
            "message": "Incorrect",
            "field": "canBeDownloaded"
        })
    }
    if(typeof publicationDate !== "string"){
        error.push({
            "message": "Incorrect",
            "field": "publicationDate"
        })
    }
    if(typeof req.body.minAgeRestriction !== "number" || req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18){
        error.push({
            "message": "Incorrect",
            "field": "minAgeRestriction"
        })
    }
    if(error.length){
        res.status(400).send({errorMessages: error})
        return;
    }
    const id = +req.params.id
    let video = videos.find(v => v.id === id)
    if(video){
        video.title = title
        video.author = author
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        video.availableResolutions = req.body.availableResolutions

        res.status(204).send(video)
    } else{
        res.send(404)
    }
})

app.delete('/videos/:id',(req: Request, res: Response) => {
    const id = +req.params.id;
    const newVideos = videos.filter(v => v.id !== id)
    if(newVideos.length < videos.length) {
        videos = newVideos
        res.send(204)
    } else{
        res.send(404)
    }
})
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})