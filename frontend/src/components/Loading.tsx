

export default function Loading(){
    return(
      <div className="w-full h-full flex justify-center items-center text-center overflow-hidden">
        <div className="absolute w-[200px] h-[200px] rounded-[50%] before:absolute before:content-[''] before:h-full before:w-full before:shadow-[0_0_5px_rgba(255,255,255,0.3)] before:animate-loading before:rounded-[50%] before:left-0 before:top-0">
          <div className="animate-loading-text text-[#9d9d9d] text-[22px] uppercase tracking-[1px] leading-[200px]">
            Loading
          </div>
        </div>
      </div>
    )

}

