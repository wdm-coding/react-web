import pr01 from '@/assets/images/registerHome/pr_01.png'
import pr02 from '@/assets/images/registerHome/pr_02.png'
import pr03 from '@/assets/images/registerHome/pr_03.png'
import pr04 from '@/assets/images/registerHome/pr_04.png'
import pr05 from '@/assets/images/registerHome/pr_05.png'
import prNext from '@/assets/images/registerHome/pr_next.png'
import SectionHeader from '../../../components/SectionHeader'
import styles from './index.module.scss'

interface FlowStep {
  no: string
  label: string
  icon: string
}

const FLOW_STEPS: FlowStep[] = [
  { no: '01', label: '登记申请', icon: pr01 },
  { no: '02', label: '登记受理', icon: pr02 },
  { no: '03', label: '登记审查', icon: pr03 },
  { no: '04', label: '登记公示', icon: pr04 },
  { no: '05', label: '确认单发放', icon: pr05 }
]

const RegisterProcess = () => {
  return (
    <section className={styles.processSection}>
      <SectionHeader title='登记流程' />

      <div className={styles.flowList}>
        {FLOW_STEPS.map((step, index) => (
          <div className={styles.flowItemWrapper} key={step.no}>
            <div className={styles.flowItem}>
              <img
                className={styles.flowIcon}
                src={step.icon}
                alt={step.label}
              />
              <span className={styles.flowLabel}>
                {step.no}.{step.label}
              </span>
            </div>
            {index < FLOW_STEPS.length - 1 && (
              <img className={styles.flowArrow} src={prNext} alt='' />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default RegisterProcess
