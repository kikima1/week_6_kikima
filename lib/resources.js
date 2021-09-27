import firebase from "./firebase"

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
  // console.log(output);
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