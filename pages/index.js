import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getSortedList } from '../lib/resources';

export async function getStaticProps() {
  const allData =  await getSortedList();
  console.log("from getStaticProps on /", allData)
  return {
    props: {
      allData
      }
    }
  }

export default function Home({ allData }) {
  console.log("in Home", allData)
  return (
     <>
        <h1>List of Names</h1> 
         <div className="list-group">
          {allData ?
            allData.map(({ id, name }) => (
            //<Link key={id} href={`/${id}`}>
             // <a className="list-group-item list-group-item-action">{name}</a>
             <p>{name}</p>
              
            //</Link>
          ))
          :null}
        </div>
      </>
  );
}
