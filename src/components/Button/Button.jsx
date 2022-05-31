import './Button.scss';

export default function Button( {className, value, onClick} ) {
  return (
    <div>
        <button className='className' onClick={onClick}>
            {value}
        </button>
    </div>
  )
}
