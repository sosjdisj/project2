import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { validateLogin } from '@/utils/validation'
import { handleValidationResult, validateField } from '@/utils/validation'
import { post } from '@/api/request'
import { ElMessage } from 'element-plus'
import { useFormValidation } from '@/composables/useFormValidation'
import { saveUserInfo } from '@/utils/helpers'

export function useRegister() {
  const router = useRouter()
  const store = useCounterStore()

  const Register = reactive({
    username: '',
    password: '',
    confirmpassword: '',
    phone: ''
  })

  const captchaCode = ref('')

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
      const result = await post('/auth/register', Register)

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

  const sendCaptcha = async (callback: () => void) => {
    if (!Register.phone) return ElMessage.warning('请先填写手机号')

    try {
      const result = await post('/sendCode', { phone: Register.phone })

      if (result.success) {
        ElMessage.success('验证码已发送')
        callback()
        return;
      }

      ElMessage.error(result.message || '发送失败')

    } catch (error) {
      ElMessage.error('发送验证码失败')
    }
  }

  return {
    errors,
    Register,
    captchaCode,
    checkPassword,
    GoregisterUser,
    Torouter,
    handUpdataUsername,
    handUpdataPassword,
    handUpdataConfirmPassword,
    handUpdataPhone,
    sendCaptcha,
  }
}
