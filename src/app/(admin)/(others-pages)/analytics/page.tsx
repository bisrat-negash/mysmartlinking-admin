import StatisticsChart from '@/components/ecommerce/StatisticsChart'
import Badge from '@/components/ui/badge/Badge'
import { ArrowUpIcon, CopyIcon, EyeIcon, GroupIcon } from '@/icons'
import React from 'react'

const page = () => {
  return (
    <div>
        <p className='font-bold text-2xl'>Analytics</p>
        <div>
            <p>LIfeTime</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
{/* view */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <EyeIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              View
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>

      {/* clicks */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CopyIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Clicks
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>

      {/* CTR */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              CTR
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>


      
            </div>
            {/* Other data */}
            <div className='mt-10'>
            <p className='pb-4'>Other Data</p>
           <div className='flex justify-start gap-8 items-center flex-wrap lg:flex-nowrap'>
           <div className='flex gap-10 items-center justify-between bg-[#EC63D3] text-white px-4 py-2 lg:w-[30%] w-[300px] h-[100px] rounded-xl'>
                <p className='text-lg font-semibold'>Revenue</p>
                <p>$34,000</p>
            </div> 
            <div className='flex gap-10 items-center justify-between bg-[#FEC313] text-white px-4 py-2 lg:w-[30%] w-[300px] h-[100px] rounded-xl'>
                <p className='text-lg font-semibold'> Subscription </p>
                <p>$34,000</p>
            </div>

           </div>
            </div>

            <div className='mt-10'>
                 <div className="col-span-12">
                        <StatisticsChart />
                      </div>
            </div>
        </div>
    </div>
  )
}

export default page