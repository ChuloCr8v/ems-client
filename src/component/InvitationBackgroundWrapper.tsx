import type { ReactNode } from 'react';

interface BackgroundWrapperProps {
    children: ReactNode;
}

const InvitationBackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
    return (
        <div className="min-h-screen w-full relative bg-white flex items-center justify-center overflow-hidden !p-4">
            <div className="bg-white/50 h-full w-full absolute top-0 left-0 z-10 backdrop-blur-2xl"></div>
            <div className='w-[700px] h-[700px] rounded-full  bg-[#0A96CC]/30  absolute right-0 bottom-0 z-0'></div>
            <div className='w-[700px] h-[700px] rounded-full bg-[#40B554]/30  absolute left-0 top-0 z-0'></div>
            <div className="relative z-20 w-full px-4 py-8 flex flex-col items-center">
                <div className='!mb-4'>  <img src="/public/login/zoracomLogo.png" className='w-[175px] h-[32px]' alt="" /> </div>
                <div className=' flex items-center justify-center  w-full '>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default InvitationBackgroundWrapper