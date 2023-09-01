import React from 'react'

export default function ProductImagesGrid({images,changePhoto}) {
  return (
    <div className='photos-grid'>
      {images.map(photo=>{
        return <div className="photo-wrapper">
          <img src={photo} className='photo-gd-single' onClick={()=>{changePhoto(photo)}}  />
        </div>
      })}
    </div>
  )
}
