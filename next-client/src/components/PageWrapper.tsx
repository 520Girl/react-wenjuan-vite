import Head from "next/head"
import styles from "@/styles/Common.module.scss"
type PropsType = {
    title:string
    desc?:string
	children: React.ReactNode | React.ReactNode[]
}

const PageWrapper: React.FC<PropsType> = (props: PropsType) => {
    const { title, desc, children } = props

    return (
			<>
				<Head>
					<title>{title}</title>
					<meta name="description" content={desc} />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.container}>{children}</main>
			</>
		)
}

export default PageWrapper