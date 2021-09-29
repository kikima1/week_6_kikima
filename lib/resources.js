import firebase from "./firebase"

export async function getSortedList() {
  let output = [];
  try{
    const snapshot = await firebase.collection("people").get();
    
    snapshot.forEach(
      (doc)=>{
        output.push(
          {
            id: doc.id.toString(),
            name: doc.data().name.toString()
            
          }
        );
      }
    );
    
  }catch(err){
    console.error(err);
    
  }
  console.log("from getSorted list", output)
  
return output;
}


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

//for getStaticPaths
export async function getResourceIds() {
  let output = [];
  // wrap try around our code to catch any errors that happen
  try {
    // retrieve ALL documents from firestore collection named "resources"
    const snapshot = await firebase.collection("people").get();
    
    // loop thru and build out an array of all data from firestore collection documents
    snapshot.forEach(
      (doc) => {
        // console.log(doc.id, '=>', doc.data() )
        output.push(
          {
            params: {
              id:doc.id
            }
          }
        );
      }
    );
  } catch(error) {
    console.error(error);
  }
  //console.log(output);
  return output;
}


//for getStaticProps
export async function getResourceData(idRequested)
{
  const doc = await firebase.collection("people").doc(idRequested).get();

  let output;
  if (!doc.empty) {
    output = { id:doc.id, data:doc.data() };
    
  } else {
    output = null;
  }

  return output;
}