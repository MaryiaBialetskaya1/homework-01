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