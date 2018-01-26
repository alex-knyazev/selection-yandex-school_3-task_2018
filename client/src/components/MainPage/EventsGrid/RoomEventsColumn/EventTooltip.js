import React from 'react'

import editIcon from '../../../../assets/edit.svg'

const EventTooltip = (props) => {
	const { 
		isShowEventToolTip, 
		mentor, 
		time, 
		amountPeople, 
		room, 
		title,
		handleEditEventClick 
	} = props;
	if (!isShowEventToolTip) return null;
	return (
		<div className="eventToolTipParent">
			<div className="eventTooltip">
				<div className="triangleBorder"></div>
				<div className="editEventButton" onClick={handleEditEventClick}>
					<img alt="edit event" src={editIcon} />
				</div>
				<div className="eventInfo">
					<h1>{title}</h1>
					<p>{time}  &#183; {room.title} </p>
					{
						amountPeople
							?
							<p>
								<img alt="mentor avatar" src={mentor.avatarUrl} className="mentorAvatar" />
								<span className="mentorName">{mentor.login} </span>
								<span className="amountPeople"> и {(amountPeople - 1)} участников</span>
							</p>
							:
							null
					}
				</div>
			</div>
		</div>
	)
}

export default EventTooltip;
