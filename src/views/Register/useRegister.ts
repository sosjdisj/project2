import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { validateLogin } from '@/utils/validation'
import { handleValidationResult, validateField } from '@/utils/validation'
import { post } from '@/api/request'
import { ElMessage } from 'element-plus'
import { useFormValidation } from '@/composables/useFormValidation'
import { saveUserInfo } from '@/utils/helpers'
import { sha256 } from '@/utils/crypto'

export function useRegister() {
  const router = useRouter()
  const store = useCounterStore()

  const Register = reactive({
    username: '',
    password: '',
    confirmpassword: '',
    phone: ''
  })

  const { errors, updateField, navigateWithClearErrors,
    hasNoErrors } = useFormValidation(Register)

  const handUpdataUsername = (newValue: string) => {
    updateField('username', newValue)
  }

  const handUpdataPassword = (newValue: string) => {
    updateField('password', newValue)
  }

  const handUpdataConfirmPassword = (newValue: string) => {
    updateField('confirmpassword', newValue)
  }

  const handUpdataPhone = (newValue: string) => {
    updateField('phone', newValue)
  }

  const checkPassword = (fieldName: any) => {
    validateField(fieldName, Register)
  }

  const GoregisterUser = async () => {
    const result = validateLogin(Register)
    handleValidationResult(result)

    if (hasNoErrors()) {
      const hashedPassword = await sha256(Register.password)
      const registerPayload = {
        username: Register.username,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        phone: Register.phone
      }
      const result = await post('/auth/register', registerPayload)

      if (result.success) {
        const { username, avatar, token } = result.data.data

        saveUserInfo(store, {
          username,
          avatar,
          token
        })

        ElMessage.success(result.message)
        router.replace('/home')
      }
    }
  }

  const Torouter = () => {
    navigateWithClearErrors('/login')
  }

  return {
    errors,
    Register,
    checkPassword,
    GoregisterUser,
    Torouter,
    handUpdataUsername,
    handUpdataPassword,
    handUpdataConfirmPassword,
    handUpdataPhone,
  }
}
