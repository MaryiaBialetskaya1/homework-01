import express, {Request, Response}  from 'express'

const app = express()
const port = process.env.PORT || 3000

let videos: any[] = []

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

app.post('/videos', (req:Request, res: Response) =>{
    let error: {errorsMessages: any[]}= {
        errorsMessages: []
    }

    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions

    let AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]



    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        error.errorsMessages.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }

    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        error.errorsMessages.push({
            "message": "Incorrect title",
            "field": "author"
        })
    }

    if(availableResolutions){
        if(!Array.isArray(availableResolutions)){
            error.errorsMessages.push({
                "message": "Incorrect available resolution",
                "field": "availableResolutions"
            })
        } else{
            availableResolutions.forEach(resolution => {
                !AvailableResolutions.includes(resolution) && error.errorsMessages.push({
                    "message": "Incorrect available resolution",
                    "field": "availableResolutions"
                })
            })
        }
    }
    if(error.errorsMessages.length){
        res.status(400).send(error)
        return
    }

    const newVideo = {
        id: +(new Date().getDate()),
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
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
    let error: {errorsMessages: any[]}= {
        errorsMessages: []
    }
    let title = req.body.title
    let author = req.body.author
    let canBeDownloaded = req.body.canBeDownloaded
    let minAgeRestriction = req.body.minAgeRestriction
    let publicationDate = req.body.publicationDate
    let availableResolutions = req.body.availableResolutions

    if(!title || typeof title !== "string" || !title.trim() || title.length > 40){
        error.errorsMessages.push({
            "message": "Incorrect title",
            "field": "title"
        })
    }

    if(!author || typeof author !== "string" || !title.trim() || author.length > 20){
        error.errorsMessages.push({
            "message": "Incorrect title",
            "field": "author"
        })
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