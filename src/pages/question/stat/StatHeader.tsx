import React, { FC } from "react"
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { message, type InputRef } from "antd"
import QRCode from "qrcode.react"
import styles from "./StatHeader.module.scss"

const StatHeader: FC = () => {
	const nav = useNavigate()
	const urlInputRef = useRef<InputRef>(null)

	const { id } = useParams()
	const { title, isPublished } = useGetPageInfo()

	//拷贝连接
	function copy() {
		const elem = urlInputRef.current
		if (elem === null) return
		elem.select()
		document.execCommand("copy") //拷贝选中内容
		message.success("链接已拷贝 " + elem.input?.value)
	}

	// function getLinkAndQRcodeEle() {
	// 	if (!isPublished) return null

	// 	//拼接url
	// 	const url = `${window.location.origin}/question/${id}`

	// 	//定义二维码组件
	// 	const QRcodeEle = (
	// 		<div style={{ textAlign: "center" }}>
	// 			<QRCode value={url} size={150} />
	// 		</div>
	// 	)

	// 	return (
	// 		<div>
	// 			<ASpace>
	// 				<AInput ref={urlInputRef} value={url} style={{ width: "300px" }} />
	// 				<ATooltip title="拷贝拦截">
	// 					<AButton onClick={copy} icon={<CopyOutlined />} />
	// 				</ATooltip>
	// 				<APopover content={QRcodeEle} placement="bottom">
	// 					<AButton icon={<QrcodeOutlined />}></AButton>
	// 				</APopover>
	// 			</ASpace>
	// 		</div>
	// 	)
	// }

	//优化
	const getLinkAndQRcodeEle = useMemo(() => {
		if (!isPublished) return null

		//拼接url
		const url = `${window.location.origin}/question/${id}`

		//定义二维码组件
		const QRcodeEle = (
			<div style={{ textAlign: "center" }}>
				<QRCode value={url} size={150} />
			</div>
		)

		return (
			<div>
				<ASpace>
					<AInput ref={urlInputRef} value={url} style={{ width: "300px" }} />
					<ATooltip title="拷贝拦截">
						<AButton onClick={copy} icon={<CopyOutlined />} />
					</ATooltip>
					<APopover content={QRcodeEle} placement="bottom">
						<AButton icon={<QrcodeOutlined />}></AButton>
					</APopover>
				</ASpace>
			</div>
		)
	}, [id, isPublished])

	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<ASpace>
						<AButton onClick={() => nav(-1)} type="link" icon={<LeftOutlined />}>
							返回
						</AButton>
						<ATypography.Title>{title}</ATypography.Title>
					</ASpace>
				</div>
				<div className={styles.main}>{getLinkAndQRcodeEle}</div>
				<div className={styles.right}>
					<AButton onClick={() => nav("/question/edit/" + id)} type="primary">
						编辑问卷
					</AButton>
				</div>
			</div>
		</div>
	)
}

export default StatHeader
