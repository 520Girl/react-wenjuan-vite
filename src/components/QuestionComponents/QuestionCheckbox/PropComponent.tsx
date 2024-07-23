import React from "react"

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { QuestionCheckboxProps, OptionType } from "./interface"
import { nanoid } from "nanoid"

const PropComponent: React.FC<QuestionCheckboxProps> = (props: QuestionCheckboxProps) => {
	const { title, isVertical, list = [], onChange, disabled } = props
	const [form] = AForm.useForm()

	useEffect(() => {
		form.setFieldsValue({ list, isVertical, title })
	}, [list, isVertical, title, form])

	// 监听表单变化
	function handleChange() {
		if (onChange == null) return

		const newValue = form.getFieldsValue()
		if (newValue.list) {
			newValue.list = newValue.list.filter((item: OptionType) => !(item.text == null))
		}

		const { list = [] } = newValue
		list.forEach((opt: OptionType) => {
			if (opt.value) return
			opt.value = nanoid(5)
		})
		onChange(newValue)
	}

	return (
		<AForm
			layout="vertical"
			form={form}
			initialValues={{ title, isVertical, list }}
			disabled={disabled}
			onValuesChange={handleChange}
		>
			<AForm.Item name="title" label="标题" rules={[{ required: true, message: "请输入标题" }]}>
				<AInput />
			</AForm.Item>
			<AForm.Item label="选项">
				<AForm.List name="list">
					{/*fields 就是 list */}
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }, index) => {
								return (
									<ASpace align="baseline" key={key}>
										{/* // 选项框 */}
										<AForm.Item name={[name, "checked"]} valuePropName="checked">
											<ACheckbox></ACheckbox>
										</AForm.Item>

										{/* // 当前选项框 */}
										<AForm.Item
											name={[name, "text"]}
											rules={[
												{ required: true, message: "请输入选项" },
												{
													validator: (_, text) => {
														const { list = [] } = form.getFieldsValue()

														let num = 0
														list.forEach((item: OptionType) => {
															if (item.text === text) num++
														})
														if (num === 1) return Promise.resolve()
														return Promise.reject(new Error("选项已存在"))
													},
												},
											]}
										>
											<AInput placeholder="请输入选项" />
										</AForm.Item>
										{/* // 删除 */}
										{index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
									</ASpace>
								)
							})}
							<AForm.Item>
								<AButton
									type="dashed"
									onClick={() => add({ text: "", value: "", checked: false })}
									block
									icon={<PlusOutlined />}
								>
									添加
								</AButton>
							</AForm.Item>
						</>
					)}
				</AForm.List>
			</AForm.Item>
			<AForm.Item name="isVertical" valuePropName="checked">
				<ACheckbox>垂直排列</ACheckbox>
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
