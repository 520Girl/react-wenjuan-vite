import React, { FC } from "react"
import { useDispatch } from "react-redux"
import useGetPageInfo from "@/hooks/useGetPageInfo"
import { resetPageInfo } from "@/store/pageInfoReducer"

const { TextArea } = AInput
const PageSetting: FC = () => {
	const pageInfo = useGetPageInfo()
	const dispatch = useDispatch()
	const [form] = AForm.useForm()

	useEffect(() => {
		form.setFieldsValue(pageInfo)
	}, [form, pageInfo])
	function handleValuesChange() {
		dispatch(resetPageInfo(form.getFieldsValue()))
	}
	return (
		<AForm
			layout="vertical"
			initialValues={pageInfo}
			onValuesChange={handleValuesChange}
			form={form}
		>
			<AForm.Item
				label="问卷标题"
				name="title"
				rules={[{ required: true, message: "请输入问卷标题" }]}
			>
				<AInput placeholder="请输入问卷标题" />
			</AForm.Item>
			<AForm.Item label="问卷描述" name="desc">
				<TextArea placeholder="请输入问卷描述" />
			</AForm.Item>
			<AForm.Item label="脚本代码" name="js">
				<TextArea placeholder="请输入脚本代码" />
			</AForm.Item>
			<AForm.Item label="样式代码" name="css">
				<TextArea placeholder="请输入样式代码" />
			</AForm.Item>
		</AForm>
	)
}

export default PageSetting
