import React, { Component } from 'react';
import clazz from 'classnames';
import PropTypes from 'prop-types';
import defaults from 'lodash/defaults';
import memoize from 'lodash/memoize';
import WaterRippleTouch from '../WaterRipple/WaterRippleTouch';
import iconfont from '../iconFont/iconfont.css';
import { findDOMNode } from 'react-dom';
function getStyles(props, state) {
	const {
		root,
		leftIconStyle,
		rightIconStyle,
		enterStyle,
	} = props;

	const defaultStyle = {
		root: {
			position: 'relative',
			fontSize: '12px',
			width: '100%',
			height: '48px',
			lineHeight: '48px',
			cursor: 'pointer',
			overflow: 'hidden',
			textIndent: props.leftIcon ? '48px' : '24px'
		},
		leftIconStyle: {
			verticalAlign: 'middle',
			position: 'absolute',
			left: '12px',
			top: '0',
			overflow: 'hidden',
			textIndent: '0px',
		},
		rightIconStyle: {
			verticalAlign: 'middle',
			position: 'absolute',
			right: '12px',
			top: '0',
			overflow: 'hidden',
			textIndent: '0px',
		},
		enterStyle: {
			boxShadow: '3px 3px 3px rgba(0,0,0,0.4)',
			transition: 'background-color 500ms cubic-bezier(0.23, 1, 0.23, 1) 0ms',
			backgroundColor: 'rgba(0,0,0,0.06)'
		}
	};
	let roots = root ? Object.assign(defaultStyle.root, root) : defaultStyle.root;
	if (state.enter) {
		let enterStyle = enterStyle ? Object.assign(defaultStyle.enterStyle, enterStyle) : defaultStyle.enterStyle;
		roots = Object.assign(roots, enterStyle);
	}
	if (root) {
		roots.lineHeight = roots.height;
	}

	const styles = {
		root: roots,
		leftIconStyle: leftIconStyle ? Object.assign(defaultStyle.leftIconStyle, leftIconStyle) : defaultStyle.leftIconStyle,
		rightIconStyle: rightIconStyle ? Object.assign(defaultStyle.rightIconStyle, rightIconStyle) : defaultStyle.rightIconStyle,
		//enterStyle: enterStyle ? Object.assign(defaultStyle.enterStyle,enterStyle) : defaultStyle.enterStyle,
	};

	return styles;
}

class ListItem extends Component {
	static propTypes = {
		width: PropTypes.number,
		height: PropTypes.number,
		className: PropTypes.string,
		text: PropTypes.string,
		onClick: PropTypes.func,
		leftIcon: PropTypes.element,
		rightIcon: PropTypes.element,
		children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
		onMouseEnter: PropTypes.func,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			enter: false
		};
	}
	handleMouseEnter = (event) => {
		this.setState({
			enter: true
		});
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(event);
		}
	}
	handleMouseLeave = (event) => {
		this.setState({
			enter: false
		});
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(event);
		}
	}
	handleTouchTap = (event) => {

		if (this.props.onClick) {
			this.props.onClick(event);
		}
	}
	creatTextNode = (style, data, key) => {
		return (
			<div style={style}>{data}</div>
		)
	}
	creatLeftIcon = (style, leftIcon) => {
		return (
			<span style={style}>{leftIcon}</span>
		)
	}
	creatRightIcon = (style, rightIcon) => {
		return (
			<span style={style}>{rightIcon}</span>
		)
	}
	render() {
		const {
			className,
			text,
			leftIcon,
			rightIcon,
		} = this.props;
		const styles = getStyles(this.props, this.state);
		return (
			<div style={{ position: 'relative', width: '100%', height: '100%' }}>
				<WaterRippleTouch width={styles.root.width} height={styles.root.height}>
					<div className={clazz('list-item', className)} style={styles.root} onClick={this.handleTouchTap}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}>
						{this.creatTextNode(styles.root, text, text)}
						{this.creatLeftIcon(styles.leftIconStyle, leftIcon)}
						{this.creatRightIcon(styles.rightIconStyle, rightIcon)}
					</div>
				</WaterRippleTouch>
			</div>
		);
	}
}

export default ListItem;
