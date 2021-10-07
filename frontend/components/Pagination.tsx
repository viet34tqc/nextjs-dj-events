import Link from 'next/link';

interface PaginationProps {
	page: number;
	lastPage: number;
}

const Pagination = ({ page, lastPage }: PaginationProps) => {
	return (
		<div>
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className="btn-secondary">Next</a>
				</Link>
			)}

			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className="btn-secondary">Prev</a>
				</Link>
			)}
		</div>
	);
};

export default Pagination;
