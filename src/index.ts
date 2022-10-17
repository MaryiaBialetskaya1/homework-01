import express, {Request, Response}  from 'express'
import bodyParser from 'body-parser'

const app = express()
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3000

let videos: any[] = []
let AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

app.get('/', (req: Request, res: Response) =>{
    res.send("IT-Incubator")
})

app.delete( '/testing/all-data', (req: Request, res:Response) =>{
    videos.length = 0
    res.send(204)
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.post('/videos', (req: Request, res: Response) =>{
    let error: {errorMessages: any[]} = {
        errorMessages: []
    }

    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions

    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        error.errorMessages.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }
    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        error.errorMessages.push({
            "message": "Incorrect author",
            "field": "author"
        })
    }
    if(availableResolutions){
        if(!Array.isArray(availableResolutions)){
            error.errorMessages.push({
                "message": "Incorrect available resolution",
                "field": "availableResolutions"
            })
        } else{
            availableResolutions.forEach(resolution => {
                !AvailableResolutions.includes(resolution) && error.errorMessages.push({
                    "message": "Incorrect available resolution",
                    "field": "availableResolutions"
                })
            })
        }
    }

    if(error.errorMessages.length){
        res.status(400).send(error)
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

})


//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})