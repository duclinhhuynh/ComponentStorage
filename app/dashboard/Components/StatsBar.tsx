"use client"
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "@/app/ContextApi";
import Skeleton from '@mui/material/Skeleton';
interface StatisticCard {
    id: number;
    name: string;
    icon: React.ReactNode;
    count: number;
}
export default function StatsBar() {
    const [statisticsCards, setStatisticsCard] = React.useState<StatisticCard[]>([
        {
            id: 1,
            name: "Projects Created",
            icon: <AccountTreeIcon className="text-sky-400" />,
            count: 3,
        },
        {
            id: 2,
            name: "Components Added",
            icon: <CategoryIcon className="text-sky-400" />,
            count: 12,
        },
        {
            id: 3,
            name: "Favorites components",
            icon: <FavoriteIcon className="text-sky-400" />,
            count: 12,
        },
    ]);
    return (
        <div className="mt-sl flex flex-col gap-1">
            <div className="grid grid-cols-3 gap-4 rounded-1g mt-2">
                {statisticsCards.map((card, index) => (
                    <div key={index}>
                        <CategoriesCard singleCard={card} />
                    </div>
                ))}
            </div>
        </div>
    );
    function CategoriesCard({ singleCard }: { singleCard: StatisticCard }) {
        const {
            isLoadingObject: { isLoading }
        } = useAppContext();
        return (
            < div className="flex gap-4 items-center p-4 bg-white rounded-lg" >
                <div className="w-[45px] h-[45px] bg-sky-100 rounded-full flex items-center justify-center max-md:hidden">
                    {singleCard.icon}
                </div>
                <div className="flex flex-col max-sm:justify-center">
                    {isLoading ? (  
                        <Skeleton className="mb-2" variant="rectangular" width={105} height={25} />
                    ) : (
                        <span className="font-bold text-2x1 max-sm:text-center">{singleCard.count}</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className=" text-sm font-light text-slate-400 max-sm: text-[11px] ">
                        {singleCard.name}
                    </span>
                </div>
            </div >
        );
    }
}