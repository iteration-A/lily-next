import { useState } from 'react'
import type { FormEvent } from 'react'

const useInput = (defaultValue = '') => {
	const [value, setValue] = useState(defaultValue)

	const updateValue = (e: FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

	[value, updateValue, () => setValue('')]
}

export default useInput
