import multiparty from 'multiparty';

export default async function handle(req,res){
    const form = new multiparty.Form({
        uploadDir: './public'
    });

    form.parse(req, async (err,fields,files) => {
        if(err){
            throw err;
        }

        res.json(files);
    })
}



export const config = {
    api:{
        bodyParser: false,
    }
};