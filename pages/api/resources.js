// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from "../../lib/firebase";

export default async function handler(req, res) {
  try{
    const snapshot = await firebase.collection("people").get();
    let output = [];
    snapshot.forEach(
      (doc)=>{
        output.push(
          {
            id: doc.id,
            data: doc.data()
          }
        );
      }
    );
    console.log(output);
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json({output});
  }catch(err){
    console.error(err);
    res.status(500).end(err.message);
  }
  
}
