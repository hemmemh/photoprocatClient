import { memo } from 'react'

import Button2 from '../../../../UI/button2/Button2'

import MyFile from '../../../../UI/myFile/MyFile'

interface IImagesProduct {
    addFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    fileImages: Array<string | ArrayBuffer | null>

}
export const ImagesProduct = memo(({ addFile, fileImages }: IImagesProduct) => {
    return (
        <div className="adminModalProduct__images">
            <div className="adminModalProduct__imageAdd">
                <MyFile setValue={addFile}><Button2 className='buttonCart'>выбрать изображение (минимум 2)</Button2></MyFile>

            </div>
            <div className="adminModalProduct__imagesItems">
                {fileImages.length !== 0 &&
          fileImages.map((f: string | ArrayBuffer | null) => {
              console.log(f)

              if (f !== null) {
                  return (
                      <div key={f.toString()} className="adminModalProduct__image">
                          <img src={f.toString()} alt=""/>
                      </div>
                  )
              }
          }

          )

                }
            </div>
        </div>
    )
})
