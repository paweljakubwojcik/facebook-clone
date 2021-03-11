import { ReactComponent as Angry } from '../../styles/svg/reactions/angry.svg'
import { ReactComponent as Care } from '../../styles/svg/reactions/happy.svg'
import { ReactComponent as Love } from '../../styles/svg/reactions/in-love.svg'
import { ReactComponent as Haha } from '../../styles/svg/reactions/laugh.svg'
import { ReactComponent as Wow } from '../../styles/svg/reactions/surprised.svg'
import { ReactComponent as Sad } from '../../styles/svg/reactions/worried.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const icons = {
    LIKE: ({ ...rest }) => <FontAwesomeIcon icon={faThumbsUp} {...rest} />,
    LOVE: Love,
    CARE: Care,
    HAHA: Haha,
    WOW: Wow,
    ANGRY: Angry,
    SAD: Sad,
}

export default icons
