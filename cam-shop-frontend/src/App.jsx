import { useState, useEffect } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Accordion from './components/Accordion'
import ReviewPanel from './components/ReviewPanel'

function App() {
  const [catalog, setCatalog] = useState({})
  const [reviewContent, setReviewContent] = useState({})
  useEffect(()=>{
    fetch('/data/catalog.json').then(
      resp=>resp.json()
    ).then(
      data=> setCatalog(data.catalog)
    ).catch(err=> console.error(`Error loading catalog data due to:${err}`))

    fetch('/data/content.json').then(
      resp=>resp.json()
    ).then(
      data=> setReviewContent(data.review)
    ).catch(err=> console.error(`Error loading catalog data due to:${err}`))

  },[])


  if(JSON.stringify(catalog)=='{}' || JSON.stringify(reviewContent)=='{}'){
    return <h1>loading</h1>
  }
  return (
  <main>
    <h1 className='phone-only'>
      Let's get started!
    </h1>
    <Accordion catalog={catalog}/>
    <ReviewPanel content={reviewContent} categories={catalog.map(category=>category.label)}/>
  </main>
  
  )
}

export default App
