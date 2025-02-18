
interface PageHeaderProps{
    title : string;
}


export const PageHeader = ({title} : PageHeaderProps) => {
    return(
        <h2 className="flex text-4xl font-bold dark:text-white justify-center mb-3">
          {title}
        </h2>
    )
}