import React, { useEffect } from 'react'
import JobCard from '../common/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterJobs, setSearchQuery } from '@/redux/jobSlice'
import axios from 'axios'
import { motion } from 'framer-motion'

const BrowsePage = () => {
    const { filterJobs } = useSelector(store => store.job)
    const { searchQuery } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'CareerRise - Browse Jobs'
    }, []);


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_API_JOB}/get?keyword=${searchQuery}`
                const res = await axios.get(apiUrl, { withCredentials: true });
                if (res.status === 200) {
                    dispatch(setFilterJobs(res.data.jobs))
                    dispatch(setSearchQuery(null))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])

    return (
        <div className='max-w-[95rem] mx-auto my-10 max-sm:my-5'>
            <h1 className='text-xl font-bold'>Showing Search Results({filterJobs?.length})</h1>
            <div className='grid grid-cols-3 gap-8 p-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                {filterJobs.length > 0 && filterJobs.map((job, index) => (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: (index * 0.1) }}
                        key={index}
                    >
                        <JobCard job={job} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default BrowsePage