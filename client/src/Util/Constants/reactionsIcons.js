import { ReactComponent as Angry } from '../../styles/svg/reactions/angry.svg'
/* import { ReactComponent as Care } from '../../styles/svg/reactions/laughing.svg' */
import { ReactComponent as Care } from '../../styles/svg/reactions/in-love.svg'
import { ReactComponent as Haha } from '../../styles/svg/reactions/laughing.svg'
import { ReactComponent as Wow } from '../../styles/svg/reactions/shocked.svg'
import { ReactComponent as Sad } from '../../styles/svg/reactions/sad.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const icons = {
    LIKE: ({ ...rest }) => <FontAwesomeIcon icon={faThumbsUp} {...rest} />,
    LOVE: ({ ...rest }) => <FontAwesomeIcon icon={faHeart} {...rest} color={'red'}/>,
    CARE: Care,
    HAHA: Haha,
    WOW: Wow,
    ANGRY: Angry,
    SAD: Sad,
}

export default icons
