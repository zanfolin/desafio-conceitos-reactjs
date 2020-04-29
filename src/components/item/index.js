import React from 'react'

import './styles.css'

export default function Item({data}) {

   return(
      <div id="item">
         <strong>{data.title}</strong>
         <p>{data.techs}</p>
         <span>{data.url}</span>
      </div>
   )
}