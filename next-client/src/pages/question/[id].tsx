import PageWrapper from "@/components/PageWrapper"
import { getQuestion } from "@/servers/question"
import { getComponentTypeModule } from "@/components/QuestionComponents"
import styles from "@/styles/Question.module.scss"

type PropsType = {
	errno: number
	data: {
		id: string
		title: string
		desc: string
		js: string
		css: string
		isDeleted: boolean
		isPublished: boolean
		componentList: any[]
	}
	msg?: string
}

export default function QuestionPage(props: PropsType) {
	const { errno, data, msg } = props
	const { isPublished, title, isDeleted,componentList,id } = data

	//数据错误
	if (errno !== 0) {
		return (
			<PageWrapper title="数据错误">
				<h1>错误</h1>
				<p>{msg}</p>
			</PageWrapper>
		)
	}
	//未发布
	if (isPublished === false) {
		return (
			<PageWrapper title="未发布">
				<h1>{title}</h1>
				<p>该问卷尚未发布</p>
			</PageWrapper>
		)
	}
	//是否被删除
	if (isDeleted) {
		return (
			<PageWrapper title="未发布">
				<h1>{title}</h1>
				<p>该问卷尚已经被删除</p>
			</PageWrapper>
		)
	}

    //遍历获取组件
    const ComponentListElem = (
			<>
				{componentList.map(c => {
					const ComponentElem = getComponentTypeModule(c)
                    console.log()
					return (
						<div key={c.fe_id} className={styles.componentWrapper}>
							{ComponentElem}
						</div>
					)
				})}
			</>
		)
	return (
		<PageWrapper title="问卷调查">
			<form method="post" action="/api/answer">
				<input type="hidden" name="questionId" value={id} />
				{ComponentListElem}
				<div className={styles.submitBtnContainer}>
					<button type="submit">提交</button>
				</div>
			</form>
		</PageWrapper>
	)
}

export async function getServerSideProps(context: any) {
	const { id } = context.params

	//根据id 得到返回值
	const data = await getQuestion(id)
	console.log(data)
	return {
		props: {
			...data,
		},
	}
}
