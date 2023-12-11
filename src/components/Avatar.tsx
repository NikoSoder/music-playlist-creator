interface ChildPropsAvatar {
  name?: string;
  image?: string;
}

const Avatar = (props: ChildPropsAvatar) => {
  return (
    <div className="flex items-center gap-2">
      {props.image ? (
        <figure className="h-7 w-7 overflow-hidden rounded-full ring ring-sky-800 ring-offset-2 ring-offset-zinc-900 md:h-8 md:w-8">
          <img
            className="w-full"
            src={props.image}
            alt="spotify profile picture"
          />
        </figure>
      ) : null}
      <p className="hidden sm:inline-block">{props.name}</p>
    </div>
  );
};

export default Avatar;
