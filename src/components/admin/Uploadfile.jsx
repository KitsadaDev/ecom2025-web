import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from '../../api/product';
import useEcomStore from '../../store/ecom-store';
import { X } from 'lucide-react';
import { Loader } from 'lucide-react';


const Uploadfile = ({ form, setForm }) => {

    const [isLoading, setIsLoading] = useState(false)
    const token = useEcomStore((state) => state.token);

    const handleOnChange = (e) => {
        setIsLoading(true)
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            let allFiles = form.images;
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);

                const file = files[i];
                if (!file.type.startsWith('image/')){
                    toast.error(`File ${file.name} is not an image`)
                    continue
                }

                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data) => {
                        uploadFiles(token,data)
                        .then((res) =>{
                            console.log(res);
                            allFiles.push(res.data);
                            setForm({
                                ...form,
                                images: allFiles
                            })
                        })
                        setIsLoading(false)
                        toast.success(`uploaded successfully`)
                        .catch((err) =>{
                            console.log(err)
                            setIsLoading(false)
                        })
                    },
                    'base64'
                )
                    
            }
        }
        console.log(e.target.files);
    }

    const handleDelete = async (public_id) => {
        const images = form.images

        removeFiles(token,public_id)
        .then((res) =>{
            const filterImages = images.filter((item) => {
                return item.public_id !== public_id
            });
            console.log(filterImages);
            setForm({
                ...form,
                images: filterImages
            });
            toast.success(res.data);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

  return (
    <div className='my-4 '>

        <div className='flex mx-4 gap-4 my-4'>
            {
                isLoading && <Loader className='animate-spin w-10 h-10' />
            }
            {
                form.images.map((item,index) =>
                    <div className='relative hover:scale-110 transition-all duration-300' key={index}>
                        <img className='w-24 h-24 rounded-sm' src={item.url}/>
                        <span className='absolute top-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer' onClick={() => handleDelete(item.public_id)}><X className='w-3 h-3 text-white' /></span>
                    </div>
                )
                    
            }
        </div>

        <div>
            <input className='cursor-pointer border' onChange={handleOnChange} type='file' name="images" multiple />
        </div>
    </div>
  )
}

export default Uploadfile
