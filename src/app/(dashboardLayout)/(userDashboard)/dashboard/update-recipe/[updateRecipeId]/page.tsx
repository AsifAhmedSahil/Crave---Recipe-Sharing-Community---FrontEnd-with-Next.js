import React from 'react'

const updaterecipe = ({ params }: { params: { updaterecipeid: string } }) => {
    console.log(params.updaterecipeid,"*****************")
  return (
    <div>{params.updaterecipeid}</div>
  )
}

export default updaterecipe