import React from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { setCompanyUpdating } from '@/redux/companySlice'

const UpdateCompany = () => {
    const { company } = useSelector((store) => store.company);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const companyId = params.id

    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            name: company?.name || '',
            description: company?.description || '',
            website: company?.website || '',
            location: company?.location || '',
        }
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setCompanyUpdating(true))
            const apiUrl = `${import.meta.env.VITE_API_COMPANY}/update/${companyId}`

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('website', data.website);
            formData.append('location', data.location);
            formData.append('logo', data.skills);
            if (data.logo[0]) {
                formData.append('file', data.logo[0]);
            }
            const res = await axios.put(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            toast.success(res.data.message);
            navigate(`/admin/companies/${companyId}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating profile');
            console.log(error);
        } finally {
            dispatch(setCompanyUpdating(false))
        }
    };

    return (
        <div className='max-w-5xl my-10 mx-auto'>
            <div className='flex justify-between items-center'>
                <Button variant='outline' onClick={() => navigate(`/admin/companies/${companyId}`)}><ArrowLeft /> Back</Button>
                <h1 className='text-3xl font-bold w-full text-center'>Update Company</h1>
            </div>
            <div className='w-full p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-4 items-center my-5'>
                        <Label className='text-base w-1/3'>Company Name:</Label>
                        <Input type='text' id='name' {...register('name')} />
                    </div>
                    <div className='flex gap-4 items-center my-5'>
                        <Label className='text-base w-1/3'>Company Description:</Label>
                        <Input type='text' id='description' placeholder='Enter Description For Your Company' {...register('description')} />
                    </div>
                    <div className='flex gap-4 items-center my-5'>
                        <Label className='text-base w-1/3'>Company Website Url:</Label>
                        <Input type='text' id='website' placeholder='Company Website (https://www.example.com)' {...register('website')} />
                    </div>
                    <div className='flex gap-4 items-center my-5'>
                        <Label className='text-base w-1/3'>Company Location:</Label>
                        <Input type='text' id='bio' placeholder='Enter Company Location' {...register('location')} />
                    </div>
                    <div className='flex gap-4 items-center my-5'>
                        <Label className='text-base w-1/3'>Upload Company Logo:</Label>
                        <Input type='file' id='logo' {...register('logo')} />
                    </div>
                    <div className='text-center'>
                        <Button disabled={isSubmitting} type='submit' className='w-full bg-cyan-500 hover:bg-cyan-700'>
                            {isSubmitting ? <><Loader2 className='animate-spin h-4 w-4' /><span>Please Wait</span></> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCompany;
