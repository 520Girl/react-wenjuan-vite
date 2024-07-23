import React from "react"
import { QuestionRadioProps, OptionType } from "./interface"
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { nanoid } from "nanoid"

const PropComponent: React.FC<QuestionRadioProps> = (props: QuestionRadioProps) => {
	const { title, options, isVertical, onChange, value, disabled } = props
	const [form] = AForm.useForm()

	//同步数据
	function handleChange() {
		if (onChange) {
			const formValue = form.getFieldsValue() as QuestionRadioProps
			const { options = [] } = formValue
			// 删除text 为null | undefined 的options
			if (options) {
				options.filter(item => !(item.text === null))
			}

			// 循环添加id
			options.forEach((item: OptionType) => {
				if (item?.value) return
				item.value = nanoid(5)
			})

			onChange(formValue)
		}
	}
	return (
		<AForm
			layout="vertical"
			initialValues={{ title, isVertical, value, options }}
			onValuesChange={handleChange}
			form={form}
			disabled={disabled}
		>
			<AForm.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
				<AInput />
			</AForm.Item>
			<AForm.Item label="选项">
				<AForm.List name="options">
					{/*fields 就是 options */}
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name }, index) => {
								return (
									<ASpace align="baseline" key={key}>
										{/* // 当前选项框 */}
										<AForm.Item
											name={[name, "text"]}
											rules={[
												{ required: true, message: "请输入选项" },
												{
													validator: (_, text) => {
														const { options = [] } = form.getFieldsValue()

														let num = 0
														options.forEach((item: OptionType) => {
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
										{index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
									</ASpace>
								)
							})}
							<AForm.Item>
								<AButton
									type="dashed"
									onClick={() => add({ text: "", value: "" })}
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
			<AForm.Item label="默认选中" name="value">
				<ASelect
					value={value}
					options={options?.map(({ text, value }) => ({ value, label: text || "" }))}
				></ASelect>
			</AForm.Item>
			<AForm.Item name="isVertical" valuePropName="checked">
				<ACheckbox>竖向排列</ACheckbox>
			</AForm.Item>
		</AForm>
	)
}

export default PropComponent
