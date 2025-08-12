import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import { setJob } from '@/redux/jobSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '../ui/avatar'
import { toast } from 'sonner'

const JobDescription = () => {
    const { user } = useSelector(store => store.auth)
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/get/${jobId}`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    setIsApplied(res.data.job?.applications?.some(application => application.candidate === user?._id))

                    dispatch(setJob(res.data.job))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJob();
    }, [jobId, dispatch, user?._id]);
    const { job } = useSelector(store => store.job)
    const isAlreadyApplied = job?.applications?.some(application => application.candidate === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isAlreadyApplied);

    const handleApplyNow = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_APPLICATION}/apply/${jobId}`
            const res = await axios.get(apiUrl, { withCredentials: true });
            if (res.status === 201) {
                setIsApplied(true);
                const updatedJob = { ...job, applications: [...job.applications, { candidate: user?._id }] }
                dispatch(setJob(updatedJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }


    return (
        <div className="max-w-7xl mx-auto my-10 max-md:max-w-screen-md max-sm:max-w-screen-sm">
            <div className='w-full flex justify-end px-4 my-2 sm:hidden'>
                <Button disabled={isApplied} onClick={handleApplyNow} className='bg-cyan-500 hover:bg-cyan-700'>{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6 max-sm:gap-2 px-5'>
                    <Avatar className='h-28 w-28'>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                    <div>
                        <h1 className='text-2xl font-bold max-sm:text-xl'>{job?.title}</h1>
                        <div className='flex gap-5 mt-5 max-sm:gap-2 max-sm:flex-col max-sm:items-start'>
                            <Badge variant='ghost' className='text-red-600 font-medium text-sm'>{job?.salary} LPA</Badge>
                            <Badge variant='ghost' className='text-blue-600 font-medium text-sm'>{job?.position} Positions</Badge>
                            <Badge variant='ghost' className='text-cyan-500 font-medium text-sm'>{job?.jobType}</Badge>
                        </div>
                    </div>
                </div>
                <div className='px-5 max-sm:hidden'>
                    <Button disabled={isApplied} onClick={handleApplyNow} className='bg-cyan-500 hover:bg-cyan-700'>{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
                </div>
            </div>
            <div>
                <h1 className='border-b p-5 px-10 my-2 text-lg font-medium max-sm:text-sm text-center'>{job?.description}</h1>
                <div className='flex gap-5 items-center text-lg p-5 max-sm:text-base max-sm:justify-center'>
                    <div className='grid grid-cols-2 gap-5 items-center'>
                        <h1 className='font-medium'>Role :</h1>
                        <h2>{job?.title}</h2>
                        <h1 className='font-medium'>Location :</h1>
                        <h2>{job?.location}</h2>
                        <h1 className='font-medium'>Experience :</h1>
                        <h2>{job?.experienceLevel} years</h2>
                        <h1 className='font-medium'>Salary :</h1>
                        <h2>{job?.salary} LPA</h2>
                        <h1 className='font-medium'>Requirements :</h1>
                        <div className='flex gap-2 max-md:flex-wrap'>
                            {job?.requirements.map((item, index) => (
                                <h2 key={index}>
                                    <Badge variant='ghost'>{item}</Badge>
                                </h2>
                            ))}
                        </div>
                        <h1 className='font-medium'>Total Applicants :</h1> <h2>{job?.applications?.length}</h2>
                        <h1 className='font-medium'>Post Date :</h1> <h2>{job?.createdAt.split("T")[0]}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription