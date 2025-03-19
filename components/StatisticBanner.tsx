interface StatisticBannerProps {
    text: string
    bgColor?: string
  }
  
  export default function StatisticBanner({ text, bgColor = "bg-green-100" }: StatisticBannerProps) {
    return (
      <div className={`w-full py-12 ${bgColor}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">{text}</h3>
        </div>
      </div>
    )
  }
  
  