const getInitials = (name) => {
    let initials;
    const nameSplit = name.toString().split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};

const getColor = (id) => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(id * 16)];
    }
    return color;
};

function ProfilePicture( { name, id, size } ) {
	return (
		<>
		<div className="profile-pic">
			<h1>
				{getInitials(name)}
			</h1>
		</div>
		</>
	);
}

export default ProfilePicture;