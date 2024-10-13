/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from 'react'

const updaterecipe = ({ params }: { params: { updaterecipeid: string } }) => {
    console.log(params.updaterecipeid,"*****************")
  return (
    <div>{params.updaterecipeid}</div>
  )
}

export default updaterecipe