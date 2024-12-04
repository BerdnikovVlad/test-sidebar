import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/', active: false },
    { title: 'Sales', icon: 'chart-line', path: '/sales', active: true },
    { title: 'Costs', icon: 'chart-column', path: '/costs', active: false },
    { title: 'Payments', icon: 'wallet', path: '/payments', active: false },
    { title: 'Finances', icon: 'chart-pie', path: '/finances', active: false },
    { title: 'Messages', icon: 'envelope', path: '/messages', active: false },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings', active: false },
    { title: 'Support', icon: 'phone-volume', path: '/support', active: false },
];

const SidebarContainer = styled.div`
    position: relative;
    width: ${({ $isOpened }) => ($isOpened ? '256px' : '72px')};
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background-color: ${({ color }) => `var(--color-sidebar-background-${color}-default)`};
    transition: width 300ms ease;
`;

const SidebarToggle = styled.button`
    position: absolute;
    top: 30px;
    right: ${({ $isOpened }) => ($isOpened ? '-10px' : '-32px')};
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    outline: none;
    border-radius: 50%;
    background-color: ${({ color, $isOpened }) =>
        $isOpened
            ? `var(--color-button-background-${color}-active)`
            : `var(--color-button-background-${color}-default)`};
    color: ${({ color }) => `var(--color-text-${color}-default)`};
    transform: ${({ $isOpened }) => ($isOpened ? 'rotate(-180deg)' : 'rotate(0)')};
    transition-duration: 300ms;
    transition-property: right, color, background-color, transform;
    transition-timing-function: ease;
`;

const SidebarHeader = styled.div`
    padding: 24px 18px;
`;

const SidebarLogo = styled.div`
    display: flex;
    align-items: center;
    
    img {
        width: 36px;
        height: 36px;
        flex-shrink: 0;
        display: block;
        object-fit: cover;
    }
    
    span {
        width: ${({ $isOpened }) => ($isOpened ? 'auto' : '0')};
        margin-left: ${({ $isOpened }) => ($isOpened ? '6px' : '0')};
        opacity: ${({ $isOpened }) => ($isOpened ? '1' : '0')};
        color: ${({ color }) => `var(--color-text-logo-${color}-default)`};
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        white-space: nowrap;
        transition-duration: 300ms;
        transition-property: width, margin-left, opacity;
        transition-timing-function: ease;
        
    }
`;

const SidebarContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 24px;
    padding-inline: 18px;
    overflow: hidden auto;
    gap: 24px;
`;

const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SidebarMenuItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    border-radius: 12px;
    background-color: ${({ color, $active }) => ($active ? `var(--color-sidebar-background-${color}-active)` : 'transparent')};
    color: ${({ color, $active }) => ($active ? `var(--color-text-${color}-active)` : `var(--color-text-${color}-default)`)};
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    transition-duration: 300ms;
    transition-property: color, background-color;
    transition-timing-function: ease;
    
    svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: block;
    }

    span {
        width: ${({ $isOpened }) => ($isOpened ? 'auto' : '0')};
        margin-left: ${({ $isOpened }) => ($isOpened ? '12px' : '0')};
        opacity: ${({ $isOpened }) => ($isOpened ? '1' : '0')};
        white-space: nowrap;
        transition-duration: 300ms;
        transition-property: width, margin-left, opacity;
        transition-timing-function: ease;
    }
    
    &:hover {
        ${({ $active, color }) => !$active && `
            background-color: var(--color-sidebar-background-${color}-hover);
            color: var(--color-text-${color}-hover);
        `}
    }
`;

const Sidebar = (props) => {
    const { color } = props;
    const [isOpened, setIsOpened] = useState(false);

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    const toggleSidebar = () => {
        setIsOpened(v => !v);
    };

    return (
        <SidebarContainer
            color={color}
            $isOpened={isOpened}
        >
            <SidebarHeader>
                <SidebarLogo
                    color={color}
                    $isOpened={isOpened}
                >
                    <img src={logo} alt="TensorFlow logo"/>
                    <span>TensorFlow</span>
                </SidebarLogo>
                <SidebarToggle
                    color={color}
                    $isOpened={isOpened}
                    type="button"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon='angle-right' />
                </SidebarToggle>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {
                        routes.map(route => (
                            <SidebarMenuItem
                                key={route.title}
                                onClick={() => {
                                    goToRoute(route.path);
                                }}
                                color={color}
                                $isOpened={isOpened}
                                $active={route.active}
                            >
                                <FontAwesomeIcon icon={route.icon}/>
                                <span>{route.title}</span>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
                <SidebarMenu>
                    {
                        bottomRoutes.map(route => (
                            <SidebarMenuItem
                                key={route.title}
                                onClick={() => {
                                    goToRoute(route.path);
                                }}
                                color={color}
                                $isOpened={isOpened}
                                $active={route.active}
                            >
                                <FontAwesomeIcon icon={route.icon}/>
                                <span>{route.title}</span>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
            </SidebarContent>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]).isRequired,
};

export default Sidebar;
