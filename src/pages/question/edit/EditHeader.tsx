import React, { FC } from "react"
import { useDispatch } from "react-redux"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./EditHeader.module.scss"
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons"
import EditToolbar from "./EditToolbar"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import useGetComponentsInfo from "@/hooks/useGetComponentsInfo"
import { changePageTitle } from "@/store/pageInfoReducer"
import { updateQuestions } from "@/services/question"

const { Title } = ATypography

//显示修改标题
const TitleEle: FC = () => {
	const { title } = useGetPageInfo()
	const [edit, setEdit] = useState(false)
	const dispatch = useDispatch()

	function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(changePageTitle(e.target.value))
	}
	if (edit) {
		return (
			<AInput
				value={title}
				onChange={handleChangeTitle}
				onPressEnter={e => setEdit(false)}
				onBlur={() => setEdit(false)}
			/>
		)
	}
	return (
		<ASpace>
			<Title>{title}</Title>
			<AButton icon={<EditOutlined />} type="text" onClick={() => setEdit(true)} />
		</ASpace>
	)
}

//保存 将数据提交给服务器
const SaveEle: FC = () => {
	//需要保存的pageInfo 和 componentList
	const { componentList = [] } = useGetComponentsInfo()
	const pageInfo = useGetPageInfo()
	const { id } = useParams()

	const { run: save, loading } = useRequest(
		async () => {
			if (!id) return
			await updateQuestions(id, {
				...pageInfo,
				componentList,
			})
		},
		{
			manual: true,
		}
	)

	//快捷键
	useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
		event.preventDefault()
		if (!loading) save()
	})

	//自动保存 不是定期保存
	useDebounceEffect(
		() => {
			save()
		},
		[pageInfo, componentList],
		{
			wait: 1000,
		}
	)
	return (
		<AButton onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
			保存
		</AButton>
	)
}

//发布
const PublishEle: FC = () => {
	const nav = useNavigate()
	const { id } = useParams()
	const { componentList = [] } = useGetComponentsInfo()
	const pageInfo = useGetPageInfo()

	const { run: publish, loading } = useRequest(
		async () => {
			if (!id) return
			await updateQuestions(id, {
				...pageInfo,
				componentList,
				isPublished: true,
			})
		},
		{
			manual: true,
			onSuccess: () => {
				message.success("发布成功")
				nav("/question/stat/" + id) //调整到发布页面
			},
		}
	)
	return (
		<AButton
			type="primary"
			onClick={publish}
			disabled={loading}
			icon={loading ? <LoadingOutlined /> : null}
		>
			发布
		</AButton>
	)
}

//编辑器头部
const EditHeader: FC = () => {
	const nav = useNavigate()

	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<ASpace>
						<AButton type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</AButton>
						<TitleEle />
					</ASpace>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<ASpace>
						<SaveEle />
						<PublishEle />
					</ASpace>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
