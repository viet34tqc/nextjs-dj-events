import Link from "next/link";

interface PaginationProps {
	page: number;
	lastPage: number;
}

const Pagination = ({ page, lastPage }: PaginationProps) => {
	return (
		<div>
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className="btn-secondary">Prev</a>
				</Link>
			)}

			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className="btn-secondary">Next</a>
				</Link>
			)}
		</div>
	);
};

export default Pagination;
