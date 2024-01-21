import { FC } from "react";
import usePagination from "@mui/material/usePagination";
import { useRouter } from "next/navigation";
import { PAGE_SIZE } from "@/pages/blog";

interface IPaginationProps {
    currentPage: number;
    totalCount: number;
    search: string;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, totalCount, search }) => {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    const { items } = usePagination({
        count: totalPages,
        page: currentPage
    });

    const router = useRouter();

    const changePage = (page: number) => {
        router.push(`/blog?${search ? `search=${search}&page=${page}` : `page=${page}`}`);
    };

    return (
        <div className="blog__pagination">
            {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;
                if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = "…";
                } else if (type === "page") {
                    children = (
                        <div
                            className={`blog__pagination-item ${
                                page === currentPage && "blog__pagination-item--active"
                            }`}
                            onClick={() => changePage(page as number)}
                        >
                            {page}
                        </div>
                    );
                } else {
                    children =
                        type === "previous" ? (
                            <div
                                className="blog__pagination-arrow blog__pagination-arrow-prev"
                                onClick={() => {
                                    if (currentPage === 1) return;
                                    changePage(currentPage - 1 as number);
                                }}
                            >
                                <svg
                                    width="38"
                                    height="30"
                                    viewBox="0 0 38 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.466 29.2461L16.9407 27.5779L3.96966 16.1119L38 16.1119L38 13.8853L3.96966 13.8853L16.9407 2.41935L15.466 0.751137L2.51879e-06 14.4226L2.6195e-06 15.5746L15.466 29.2461Z"
                                        fill="#353535"
                                        fillOpacity={currentPage === 1 ? "0.4" : "1"}
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div
                                className="blog__pagination-arrow blog__pagination-arrow-next"
                                onClick={() => {
                                    if (currentPage === totalPages) return;
                                    changePage(currentPage + 1 as number);
                                }}
                            >
                                <svg
                                    width="38"
                                    height="30"
                                    viewBox="0 0 38 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.534 0.753906L21.0593 2.42212L34.0303 13.8881H0V16.1147H34.0303L21.0593 27.5806L22.534 29.2489L38 15.5774V14.4254L22.534 0.753906Z"
                                        fill="#353535"
                                        fillOpacity={currentPage === totalPages ? "0.4" : "1"}
                                    />
                                </svg>
                            </div>
                        );
                }

                return <div key={index}>{children}</div>;
            })}
        </div>
    );
};

export default Pagination;
