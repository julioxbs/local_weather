import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCircleQuestion,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

type headerProps = {
  saveData?: () => void;
  isTheSame?: boolean;
}

export const Header = ({ saveData, isTheSame }: headerProps) => {
  const { pathname } = useLocation();

  return (
    <header className="p-5 shadow-lg text-white shadow-test relative">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-5">
          <FontAwesomeIcon fontSize={"1.3rem"} icon={faGear} />
          <Link to={"/"}>
            <h1 className="text-[1.5rem]">The Local Weather</h1>
          </Link>
        </div>

        <div className="wrapper__icons flex items-center gap-5">
          <FontAwesomeIcon
            className="cursor-pointer"
            fontSize={"1.3rem"}
            icon={faCircleQuestion}
          />

          {pathname != '/' && !isTheSame && <FontAwesomeIcon
              onClick={saveData}
              className="cursor-pointer"
              fontSize={"1.3rem"}
              icon={faPlus}
            />}
        </div>
      </div>
    </header>
  );
};
